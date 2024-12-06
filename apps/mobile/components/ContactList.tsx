import { ContactPhoto, type Contact, type ContactList } from "@/types/api";
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
import { ReloadSvg } from "./icons/ReloadSvg";

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

  const loadMore = async (forceReload = false) => {
    try {
      if (!forceReload && (isLoading || !hasMore)) return;
      setIsLoading(true);
      const data = await getContactList(search, offset);
      setIsLoading(false);
      setContactList((prevData) => {
        console.log("prevData", prevData);
        return [...prevData, ...data.items];
      });
      setTotal(data.total);
      setOffset((prevPage) => prevPage + BATCH);
    } catch (error) {
      console.log("LOAD_MORE_ERROR", error);
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

  const load = useThrottle(() => {
    setOffset(0);
    setContactList([]);
    setTotal(1);
    loadMore(true);
  }, 200);

  useEffect(() => {
    load();
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          icon={
            <ReloadSvg
              style={{
                width: 20,
                height: 20,
              }}
            />
          }
          onPress={() => {
            if (!search) {
              load();
            } else {
              setSearch("");
            }
          }}
        />
        <Input
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={{
            flex: 1,
          }}
        />
      </View>
      <VirtualizedList
        data={contactList}
        initialNumToRender={10}
        renderItem={({ item }) => {
          const dateObj = new Date(item.createdAt);
          const date = dateObj.toLocaleDateString();
          const time = dateObj.toLocaleTimeString();
          return (
            <View
              style={[
                styles.item,
                {
                  backgroundColor: colors.card,
                },
              ]}
            >
              <Text>Name: {item.name}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Phone: {item.phone}</Text>
              <Text>Description: {item.description}</Text>
              <Text>
                Created at: {date} {time}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {item.photos.map((photo, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setCurrentImage(photo)}
                  >
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        borderWidth: 1,
                      }}
                      source={{ uri: `data:image/jpeg;base64,${photo.base64}` }}
                    />
                  </TouchableOpacity>
                ))}
                <Button title="Delete" onPress={() => deleteContact(item.id)} />
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => `key-${index}`}
        getItem={getItem}
        getItemCount={getItemCount}
        onEndReached={() => loadMore()}
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
