"use client";

import {  useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';




const editBlog = async (
    title: string | undefined,
    description: string | undefined,
    id:number
    ) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`,{
        method:"PUT",
        headers:{
            "Content-type":"application/json", 
        },
        body: JSON.stringify({title,description,id})
        //input,textareaからの入力情報をJSON形式に変換する
    }
);

    return res.json();



};



const getBlogById = async (id:number) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`);

    const data = await res.json();


    return data.post;



};


const deleteBlog = async (id:number) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        }
    });

    


    return res.json();



};



//nextjs13ではここで({params}: {params:{id: number}})
const EditPost = ({params}: {params:{id: number}}) => {

    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        // console.log(titleRef.current?.value);
        // console.log(descriptionRef.current?.value);
        toast.loading("編集中です・・・",{id:"1"});
        await editBlog(
            titleRef.current?.value,
            descriptionRef.current?.value,
            params.id);

        toast.success("編集に成功しました",{id:"1"});

        router.push("/");
        router.refresh();

    } ;

    const handleDelete = async () => {
        
        await deleteBlog(params.id);

        router.push("/");
        router.refresh();
    };

    //編集画面に来たときに、編集前のtitle,descriptionをinput,textareaに入れておいてあげる
    useEffect(() => {
        getBlogById(params.id).then((data)=>{
            if(titleRef.current && descriptionRef.current){

                titleRef.current.value = data.title;
                descriptionRef.current.value = data.description;
            }
            //?.valueでエラーが出るので!をつけて対処するか、if文で書く
        }).catch(err =>{
            toast.error("エラーが発生しました",{id:"1"});
        });
    },[]);


  return (
    <>
    <Toaster />
  <div className="w-full m-auto flex my-4">
    <div className="flex flex-col justify-center items-center m-auto">
      <p className="text-2xl text-blue-400 font-bold p-3">ブログの編集 🚀</p>
      <form onSubmit={handleSubmit}>
        <input
         ref={titleRef}
          placeholder="タイトルを入力"
          type="text"
          className="rounded-md px-4 w-full py-2 my-2"
        />
        <textarea
         ref={descriptionRef}
          placeholder="記事詳細を入力"
          className="rounded-md px-4 py-2 w-full my-2"
        ></textarea>
        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
          更新
        </button>
        <button onClick={handleDelete} className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
          削除
        </button>
      </form>
    </div>
  </div>
</>
  )
}

export default EditPost;
