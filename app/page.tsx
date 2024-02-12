"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface IDesc {
  $id: string;
  task: string;
  desc: string;
}

export default function Home() {
  const [desc, setDesc] = useState<IDesc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  const handleDelete = async (id: string)=>{
    try {
      await fetch(`/api/description/${id}`, {
        method: 'DELETE'
      })
      setDesc((prev)=> prev?.filter((i)=>i.$id !== id))
    } catch (error) {
      setError("failed to delete desc")
    }
  }

  useEffect(() => {
    const fetchDesc = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(`/api/description`);

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setDesc(data);
      } catch (error) {
        console.log("error");
        setError("Failed to load desc");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDesc();
  }, []);

  return (
    <>
      {error && <p className="py-4 text-red-700">{error}</p>}
      {isLoading ? (
        <p>loading ...</p>
      ) : desc.length>0 ? (
        <div>
          {desc.map((id) => (
            <div key={id.$id} className="p-4 my-2 rounded-md border-b leading-8">
              <div className="font-bold">{id.task}</div>
              <div>
               {id.desc}
              </div>
              <div className="flex gap-3 mt-4 justify-end">
                <Link
                  className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                  href={`/edit/${id.$id}`}
                >
                  Edit
                </Link>
                <button onClick={()=>handleDelete(id.$id)} className="bg-red-500 text-white px-4 rounded-md uppercase text-sm font-bold tracking-widest">
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ): (
        <p>No todo</p>
      )}
    </>
  );
}
