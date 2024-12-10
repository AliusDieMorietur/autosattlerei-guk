import { ContactPhoto, type Contact, type ContactList } from "@/types/contact";
import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  VirtualizedList,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Button } from "./Button";
import { Text } from "./Text";
import { useTheme } from "@/hooks/useTheme";
import { assert } from "@/utils/assert";
import { Input } from "./Input";
import { useThrottle } from "@/hooks/useThrottle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ContactItem } from "./ContactItem";

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
      console.log("GET_CONTACT_LIST_ERROR", error);
      return {
        items: [],
        total: 0,
      };
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
      setContactList((prevData) => {
        console.log("prevData", prevData);
        return [...prevData, ...data.items];
      });
      setTotal(data.total);
      setOffset((prevPage) => prevPage + BATCH);
    } catch (error) {
      setContactList([]);
      console.log("LOAD_MORE_ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getItem = (data: Contact[], index: number) => data[index];
  const getItemCount = (data: Contact[]) => data.length;

  const deleteContact = async (id: number) => {
    assert(total !== 0, "Total should not be 0 when deleting contact");
    assert(offset !== 0, "Offset should not be 0 when deleting contact");
    assert(contactList.length !== 0, "Contact list should not be empty");
    await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/contact/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_SECRET_TOKEN}`,
      },
    });
    setTotal((total) => total - 1);
    setContactList((list) => list.filter((contact) => contact.id !== id));
    setOffset((offset) => offset - 1);
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          disabled={isLoading}
          icon={
            <MaterialIcons
              name="sync"
              size={20}
              color={colors.button.default.text}
            />
          }
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
        data={contactList}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <ContactItem
            contact={item}
            onImageClick={setCurrentImage}
            onDeleteClick={deleteContact}
          />
        )}
        keyExtractor={(item, index) => `key-${index}`}
        getItem={getItem}
        getItemCount={getItemCount}
        onEndReached={() => {
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!currentImage}
        onRequestClose={() => {
          setCurrentImage(null);
        }}
      >
        <View
          style={[
            styles.modal,
            {
              backgroundColor: colors.modal,
            },
          ]}
        >
          {currentImage && (
            <Image
              style={{
                width: currentImage.width,
                height: currentImage.height,
              }}
              source={{ uri: `data:image/jpeg;base64,${currentImage.base64}` }}
            />
          )}
          <Button title="Close" onPress={() => setCurrentImage(null)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 8,
  },
  container: {
    paddingBottom: 100,
  },
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
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    display: "flex",
    flexDirection: "column",
  },
});
