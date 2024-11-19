import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db, storage } from "../firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginLayout from "@/layouts/LoginLayout";
import { toast } from "react-toastify";
import { useState } from "react";
import { categories } from "@/mocks/mocks";

export function Upload() {
  const access = sessionStorage.getItem("virolatoken");

  if (!access) {
    window.location.href = "/login";
    sessionStorage.setItem("virolatoken", "");
    toast.info("You are not allowed to view this page.");
  }

  const today = new Date().toISOString().split("T")[0];
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(today);
  const [files, setFiles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...files, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please select at least one file!");
      return;
    }

    try {
      setIsLoading(true);
      // Add a new document with title and description
      const docRef = await addDoc(collection(db, "blog"), {
        title: title,
        description: description,
        category: category,
        content: content,
        date: date,
      });

      if (docRef.id) {
        const promises = [];
        // Iterate over selected files
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const storageRef = ref(storage, `blog/${docRef.id}/${file.name}`);
          promises.push(uploadBytes(storageRef, file));
          // Wait for upload to complete and get download URL
          promises.push(
            new Promise(async (resolve, reject) => {
              try {
                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);
                resolve(downloadURL);
              } catch (error) {
                reject(error);
              }
            })
          );
        }

        // Wait for all uploads to complete
        const downloadURLs = await Promise.all(promises);

        // Update the document with the image URLs
        await updateDoc(doc(db, "blog", docRef.id), {
          imageUrls: downloadURLs.filter((url) => typeof url === "string"),
        });
      }

      toast.success("Blog updated successfully");
      // Upload file to Firebase Storage
      setIsLoading(false);
      // Reset the form
      setCategory("");
      setTitle("");
      setContent("");
      setDescription("");
      setDate(today);
      setFiles([]);
    } catch (error) {
      console.error("Error uploading document: ", error);
      toast.error("Error uploading document: ", error);
    }
  };

  return (
    <LoginLayout>
      <div className="justify-center m-2 pt-5">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className=" grid w-full grid-cols-2">
            <TabsTrigger value="account">Upload Blog</TabsTrigger>
            <TabsTrigger value="password">Upload Products</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                {/* <CardTitle>Account</CardTitle> */}
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-8 m-5">
                  <div>
                    <div className="space-y-1">
                      <Label htmlFor="title">Title</Label>

                      <Input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className=" bg-[#ffffff}"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className=" bg-[#ffffff}"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="picture">Picture</Label>

                      <div class="flex items-center justify-center w-full">
                        <label
                          for="dropzone-file"
                          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span class="font-semibold">Click to upload</span>{" "}
                              or drag and drop
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            multiple
                            class="hidden"
                            type="file"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="name">Category</Label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className=" bg-[#ffffff}  flex h-14 w-full rounded-md border border-input bg-transparent px-3 py-1 text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-xl file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
                      >
                        <option value="">Select an option</option>
                        {categories &&
                          categories.map((category) => {
                            return (
                              <option key={category.id} value={category.name}>
                                {category.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-1">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        name="content"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        className=" bg-[#ffffff}"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="m-5">
                  <Button>Save changes</Button>
                </div>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LoginLayout>
  );
}
