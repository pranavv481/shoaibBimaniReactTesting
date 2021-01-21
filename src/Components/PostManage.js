import React from 'react'
import { FormControl, FormLabel, FormErrorMessage, Input, Button, Box, Textarea } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
const PostManage = ({onSubmit, defaultTitle, defaultDescription}) => {
    const { handleSubmit, control, errors } = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.title}>
            <FormLabel htmlFor="title">Title</FormLabel>

            <Controller
                defaultValue={defaultTitle}
                name="title"
                control={control}
                as={Input}
                id="title"
                placeholder="title"
                rules={{
                    required: {
                        value: true,
                        message: "It is requied"
                    },
                    minLength: {
                        value: 3,
                        message: "minimum length is 3"
                    },
                    maxLength:{
                        value:20,
                        message: "maximum length is 20"
                    }
                }}
            />
            <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.description}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Controller
                defaultValue={defaultDescription}
                name="description"
                control={control}
                as={Textarea}
                id="description"
                placeholder="description"
                rules={{
                    required: {
                        value: true,
                        message: "It is requied"
                    },
                    minLength: {
                        value: 3,
                        message: "minimum length is 3"
                    },
                    maxLength:{
                        value:100,
                        message: "maximum length is 100"
                    }
                }}
            />
            <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="teal" marginTop="1rem" >
            {defaultTitle?"Edit Post":"Add Post"}
        </Button>
    </form>
    )
}

export default PostManage
