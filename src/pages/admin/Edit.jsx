import React from "react";
import { Button } from "@/components/ui/button";
import { updateDoc, doc } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import "react-quill/dist/quill.snow.css";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useState } from "react";
import { categories } from "@/mocks/mocks";
import { firestore } from "../firebaseConfig";
import ReactQuill from "react-quill";

export function Edit({ fetchBlogs, items }) {
  const access = sessionStorage.getItem("virolatoken");

  if (!access) {
    window.location.href = "/login";
    sessionStorage.setItem("virolatoken", "");
    toast.info("You are not allowed to view this page.");
  }
  const [id, setId] = useState(items?.id || "");
  const [title, setTitle] = useState(items?.title || "");
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(items?.content || "");
  const [description, setDescription] = useState(items?.description || "");
  const [category, setCategory] = useState(items?.category || "");
  const [date, setDate] = useState(items?.date || "");

  React.useEffect(() => {
    if (items) {
      setId(items.id);
      setTitle(items.title);
      setContent(items.content);
      setDescription(items.description);
      setCategory(items.category);
      setDate(items.date);
    }
  }, [items]);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!id) {
      toast.error("Invalid blog ID. Unable to update.");
      return;
    }

    setIsLoading(true);

    try {
      const docRef = doc(firestore, "blog", id);
      await updateDoc(docRef, {
        title,
        description,
        category,
        content,
        date,
      });

      toast.success("Blog updated successfully");

      await fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(
        `Failed to update: ${error.message || "Unexpected error occurred"}`
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="justify-center m-2 pt-5">
      <form onSubmit={handleUpdate}>
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
              <ReactQuill
                className="editor"
                theme="snow"
                value={content}
                onChange={setContent}
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
