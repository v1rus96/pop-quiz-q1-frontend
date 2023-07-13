import { StorageClient } from "@supabase/storage-js";
import { supabase } from "../supabase";

const storage: StorageClient = supabase.storage;

const BUCKET = 'ekyc';

// Upload user's face capture
export const uploadFaceCapture = async (userId: string, file: File | null) => {
    if (!file) return null;

  const filePath = `${userId}/face-capture/${file?.name}`;
  const { error } = await supabase.storage.from(BUCKET).upload(filePath, file);

  if (error) throw error;

  return filePath;
};

// Upload user's valid credentials
export const uploadValidCredentials = async (userId: string, file: File | null) => {
  if (!file) return null;

  const filePath = `${userId}/valid-credentials/${file?.name}`;
  const { error } = await supabase.storage.from(BUCKET).upload(filePath, file);

  if (error) throw error;

  return filePath;
};

// Download an eKYC file
export const downloadEKYCFile = async (path: string) => {
  const { data, error } = await supabase.storage.from(BUCKET).download(path);

  if (error) throw error;

  return data;
};

// Get the public URL of an eKYC file
export const getEKYCFileURL = (path: string) => {
  return storage.from(BUCKET).getPublicUrl(path).data;
};
