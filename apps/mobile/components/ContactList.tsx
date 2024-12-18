import { ContactPhoto, type Contact, type ContactList } from "@/types/contact";
import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  VirtualizedList,
  StyleSheet,
} from "react-native";
import { Button } from "./Button";
import { useTheme } from "@/hooks/useTheme";
import { Input } from "./Input";
import { useThrottle } from "@/hooks/useThrottle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ContactItem } from "./ContactItem";
import { PreviewModal } from "./PreviewModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { Text } from "./Text";

const BATCH = 20;

const getContactList = async (search: string, offset: number) =>
  fetch(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/contact/list?search=${search}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_SECRET_TOKEN}`,
        "ngrok-skip-browser-warning": "true",
      },
    }
  )
    .then((response) => response.json() as unknown as ContactList)
    .catch((error) => {
      Sentry.captureException(error);
      console.log("GET_CONTACT_LIST_ERROR", error);
      return {
        items: [],
        total: 0,
      };
    });

const deleteContact = async (id: number) =>
  await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/contact/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_SECRET_TOKEN}`,
    },
  });

export function ContactList() {
  const { colors } = useTheme();
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(1);
  const hasMore = total > contactList.length;
  const [currentImage, setCurrentImage] = useState<null | ContactPhoto>(null);
  const [search, setSearch] = useState("");
  const [itemToDelete, setItemToDelete] = useState<Contact["id"]>(-1);

  const [error, setError] = useState<string | null>(null);

  const loadMore = async ({
    forceReload = false,
    search,
    offset,
  }: {
    search: string;
    offset: number;
    forceReload?: boolean;
  }) => {
    try {
      if (!forceReload && isLoading) return;
      setIsLoading(true);
      const data = await getContactList(search, offset);
      setContactList((prevData) => [...prevData, ...data.items]);
      setTotal(data.total);
      setOffset((prevPage) => prevPage + BATCH);
    } catch (error: any) {
      setError(error.message);
      setContactList([]);
      console.log("LOAD_MORE_ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getItem = (data: Contact[], index: number) => data[index];
  const getItemCount = (data: Contact[]) => data.length;

  const load = useThrottle((search: string) => {
    setOffset(0);
    setTotal(1);
    setContactList([]);
    loadMore({
      search,
      offset: 0,
    });
  }, 200);

  useEffect(() => load(search), []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          disabled={isLoading}
          icon={() => (
            <MaterialIcons
              name="sync"
              size={20}
              color={colors.button.default.text}
            />
          )}
          onPress={() => {
            setSearch("");
            load("");
          }}
        />
        <Input
          placeholder="Search"
          value={search}
          onChangeText={(value) => {
            setSearch(value);
            load(value);
          }}
          style={{
            flex: 1,
          }}
        />
      </View>
      <VirtualizedList
        style={styles.list}
        data={contactList}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <ContactItem
            contact={item}
            onImageClick={setCurrentImage}
            onDeleteClick={(id) => setItemToDelete(id)}
          />
        )}
        keyExtractor={(item, index) => `key-${index}`}
        getItem={getItem}
        getItemCount={getItemCount}
        onEndReached={() => {
          if (contactList.length === 0) return;
          if (!hasMore) {
            console.warn("Reached end");
            return;
          }
          loadMore({
            search,
            offset,
          });
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading && hasMore ? (
            <ActivityIndicator style={styles.loader} size="large" />
          ) : null
        }
      />
      <PreviewModal
        currentImage={currentImage}
        visible={!!currentImage}
        onRequestClose={() => setCurrentImage(null)}
        onClose={() => setCurrentImage(null)}
      />
      <DeleteConfirmModal
        visible={itemToDelete !== -1}
        onRequestClose={() => setItemToDelete(-1)}
        onClose={() => setItemToDelete(-1)}
        onDelete={async () => {
          try {
            const id = itemToDelete;
            setItemToDelete(-1);
            await deleteContact(id);
            setTotal((total) => total - 1);
            setContactList((list) =>
              list.filter((contact) => contact.id !== id)
            );
            setOffset((offset) => offset - 1);
          } catch (error) {
            console.error("DELETE_CONTACT_ERROR", error);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 8,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingBottom: 40,
  },
  list: {},
  item: {
    display: "flex",
    flexDirection: "column",
    padding: 8,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 8,
    gap: 4,
  },
  loader: {},
});
