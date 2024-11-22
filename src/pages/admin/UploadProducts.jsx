import { Button } from "@/components/ui/button";
import { db, storage } from "../firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useState } from "react";
import { categories } from "@/mocks/mocks";

export function UploadProducts({ fetchProducts }) {
  const access = sessionStorage.getItem("virolatoken");

  if (!access) {
    window.location.href = "/login";
    sessionStorage.setItem("virolatoken", "");
    toast.info("You are not allowed to view this page.");
  }

  const today = new Date().toISOString().split("T")[0];
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [variants, setVariants] = useState(""); //size, color, both
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(today);
  const [files, setFiles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    setFiles(files);
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
      const docRef = await addDoc(collection(db, "product"), {
        title: title,
        description: description,
        category: category,
        size: size,
        variants: variants,
        color: color,
        price: price,
        status: status,

        date: date,
      });

      if (docRef.id) {
        const promises = [];
        // Iterate over selected files
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const storageRef = ref(storage, `product/${docRef.id}/${file.name}`);
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
        await updateDoc(doc(db, "product", docRef.id), {
          imageUrls: downloadURLs.filter((url) => typeof url === "string"),
        });
      }

      toast.success("Product updated successfully");
      await fetchProducts();
      // Upload file to Firebase Storage
      setIsLoading(false);
      // Reset the form
      setCategory("");
      setTitle("");
      setSize("");
      setStatus("");
      setVariants("");
      setColor("");
      setPrice("");
      setDescription("");
      setDate(today);
      setFiles([]);
    } catch (error) {
      console.error("Error uploading document: ", error);
      toast.error("Error uploading document: ", error);
    }
  };

  return (
    <div className="justify-center m-2 pt-5">
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
              <Label htmlFor="price">Price</Label>

              <Input
                id="price"
                name="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className=" bg-[#ffffff}"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="picture">Picture</Label>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    multiple
                    className="hidden"
                    type="file"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* Display selected files */}
              <div className="mt-4">
                {files.length > 0 ? (
                  <ul className="text-sm text-gray-600 dark:text-gray-300">
                    {files.map((file, index) => (
                      <li key={index}>
                        {index + 1}. {file.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No files selected
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
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

            <div className="space-y-1">
              <Label htmlFor="variants">Variants</Label>
              <select
                value={variants}
                onChange={(e) => setVariants(e.target.value)}
                className=" bg-[#ffffff}  flex h-14 w-full rounded-md border border-input bg-transparent px-3 py-1 text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-xl file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
              >
                <option value="">Select an option</option>
                <option value="size">Size</option>
                <option value="color">Color</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className=" bg-[#ffffff}  flex h-14 w-full rounded-md border border-input bg-transparent px-3 py-1 text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-xl file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
              >
                <option value="">Select an option</option>
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="color">Color</Label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className=" bg-[#ffffff}  flex h-14 w-full rounded-md border border-input bg-transparent px-3 py-1 text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-xl file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
              >
                <option value="">Select an option</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="size">Size</Label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className=" bg-[#ffffff}  flex h-14 w-full rounded-md border border-input bg-transparent px-3 py-1 text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-xl file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
              >
                <option value="">Select an option</option>
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">L</option>
                <option value="all">All</option>
              </select>
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
          {isLoading ? (
            <Button disabled> Submitting</Button>
          ) : (
            <Button>Submit</Button>
          )}
        </div>
      </form>
    </div>
  );
}
