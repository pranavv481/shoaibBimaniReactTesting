import React, { useState } from 'react'
import { FormControl, FormLabel, FormErrorMessage, Input, Button, Box, Textarea } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { Post } from '../Util/JsonUtil';
import { useMutation } from 'react-query';
import {queryClient} from "../reactQuery";

const createComment = (content) => {
    console.log(content)
    const {comment, postId}= content
    return Post("http://localhost:3002/comments", { comment, postId })
}

const CommentEdit = ({postId}) => {
   
    console.log(postId)
    const { handleSubmit, control, errors, reset } = useForm({
        mode: "onTouched",
    });
    const mutate = useMutation(createComment)

    const onSubmitHandler = (data) => {
        console.log(data);
        console.log(postId)
        const {comment} = data
        mutate.mutateAsync({ comment, postId }).then((res) => {
            console.log(res)
            queryClient.refetchQueries(['commentList'])
            reset()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <FormControl isInvalid={errors.comment}>
                    <FormLabel htmlFor="comment">Comment</FormLabel>

                    <Controller
                        defaultValue=""
                        name="comment"
                        control={control}
                        as={Input}
                        placeholder="comment"
                        rules={{
                            required: {
                                value: true,
                                message: "It is requied"
                            },
                            minLength: {
                                value: 3,
                                message: "minimum length is 3"
                            },
                            maxLength: {
                                value: 20,
                                message: "maximum length is 20"
                            }
                        }}
                    />
                    <FormErrorMessage>{errors.comment && errors.comment.message}</FormErrorMessage>
                </FormControl>

                <Button type="submit" colorScheme="teal" marginTop="1rem" >
                    ADD Comment
        </Button>
            </form>
        </div>
    )
}

export default CommentEdit
