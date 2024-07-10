import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { getpost ,getFilePreview,deleteFile,deletePost} from "../appwrite/backconfig";



export default function Post() {
    const [post, setPost] = useState(null);
    const [image,setimage]=useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.userid : false;

    useEffect(() => {
        if (slug) {

            getpost(slug).then((post)=>{
                if(post){
                    setPost(post.data);
                    getFilePreview(post.data.featuredImage).then(response=> setimage(response));
                }
                else navigate("/");
            });
            


        } else navigate("/");
    }, [slug, navigate]);

    const Delete = () => {
        deletePost(post._id).then(status=>{
            if(status){
                deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={image}
                        alt={post.title}
                        className="rounded-xl"
                    />

                     {(isAuthor &&
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post._id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={Delete}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}