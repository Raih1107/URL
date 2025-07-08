// src/db/apiAuth.js
import supabase, { supabaseUrl } from "./supabase";

/**
 * Log in user using email and password
 */
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

/**
 * Get currently logged-in user
 */
export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);
  if (!session.session) return null;

  return session.session.user;
}

/**
 * Sign up new user with name, email, password and profile picture
 */
export async function signup({ name, email, password, profilepic }) {
  const fileName = `dp-${name.split(" ").join("-")}-${Date.now()}`;

  // 1. Upload profile picture
  const { error: storageError } = await supabase.storage
    .from("profilepic")
    .upload(fileName, profilepic, {
      cacheControl: "3600",
      upsert: false,
      contentType: profilepic.type || "image/jpeg",
    });

  if (storageError) throw new Error(storageError.message);

  // 2. Construct the correct public URL
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/profilepic/${fileName}`;

  // 3. Sign up the user with metadata
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profilepic: publicUrl,
      },
    },
  });

  if (signUpError) throw new Error(signUpError.message);

  // 4. Force metadata refresh (this is critical)
  const { data: refreshedUser, error: refreshError } = await supabase.auth.getUser();

  if (refreshError) throw new Error(refreshError.message);

  return refreshedUser.user;
}

