"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import React from "react";

export default function AddTodo() {
  const [formData, setFormData] = useState({ task: "", desc: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.task || !formData.desc) {
      setError("Please fill in details");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/description`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Add Todo</h2>
      <form onSubmit={handleSubmit} action="" className="flex gap-2 flex-col">
        <input
          onChange={handleInputChange}
          value={formData.task}
          type="text"
          name="task"
          className="py-1 px-4 border border-gray-800 rounded-md"
          placeholder="Task"
        />
        <textarea
          onChange={handleInputChange}
          value={formData.desc}
          name="desc"
          rows={4}
          placeholder="Description"
          className="py-1 px-4 border border-gray-800 rounded-md"
        ></textarea>
        <button
          className="bg-black text-white px-4 py-1 rounded-md cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </form>
      {error && <p className="text-red-700 mt-4">{error}</p>}
    </div>
  );
}
