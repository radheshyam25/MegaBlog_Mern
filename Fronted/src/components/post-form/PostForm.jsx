import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { uploadfile ,createpost, getFilePreview} from "../../appwrite/backconfig";
import {deleteFile,updatePost } from "../../appwrite/backconfig";

export default function PostForm({ post }) {
    const [image,setimage]=useState(null);
    useEffect(()=>{
        if(post){
            getFilePreview(post.featuredImage).then(preview=>{
                if(preview){
                    setimage(preview);
                }
            })
        }
    })
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file=data.image[0]? await uploadfile(data.image[0]):null;
            

            if (file) {
            
                deleteFile(post.featuredImage);
            }


            const dbPost=await updatePost(post._id,{...data,featuredImage: file?file.$id:undefined,});

            if (dbPost) {
                navigate(`/post/${dbPost.data._id}`);
            }
        } else {
        
                const file=data.image[0]? await uploadfile(data.image[0]):null;
                
                
                
    
        

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost=await createpost({...data,userid:userData.userid});

                if (dbPost) {
                    navigate(`/post/${dbPost.data._id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img

                            src={image}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}