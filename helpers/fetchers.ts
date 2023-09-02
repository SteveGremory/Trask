import { ItemInterface, SettingsInterface } from "@/interfaces/interfaces";
import { Dispatch, SetStateAction } from "react";
import { Store } from "tauri-plugin-store-api";

export const fetchSettings = async (settingsStore: Store) => {
  let background: string | null = await settingsStore.get("background");
  let username: string | null = await settingsStore.get("username");
  let animations: boolean | null = await settingsStore.get("animations");

  let settings: SettingsInterface = {
    background_path: "/background.png",
    username: "",
    animations: true,
  };

  if (background) {
    settings = {
      background_path: background,
      username: username ? username : "",
      animations: animations ? animations : false,
    };
  }

  return settings;
};

export const fetchItems = async (store: Store) => {
  let items: ItemInterface[] = [];
  store.entries().then((y) => {
    items = y.map((pair) => pair[1] as ItemInterface);
  });

  await store.save().then();

  return items;
};
