import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

//new signupSchema

const signupSchema = z.object({
    firstName: z
      .string({
        required_error: "First Name is required",
        invalid_type_error: "only strings allowed for First Name",
      })
      .trim()
      .min(2, "minimum of 2 characters required")
      .max(50, "maximum of 50 characters required"),

    lastName: z
      .string({
        required_error: "Last Name is required",
        invalid_type_error: "only strings allowed for Last Name",
      })
      .trim()
      .min(2, "minimum of 2 characters required")
      .max(50, "maximum of 50 characters required"),

    userID: z.string().nullable().optional(),

    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "email needs to be a string",
      })
      .email(),

    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "password needs to be a string",
      })
      .min(8, "password must be at least 8 characters")
      .max(50, "Password must be at most 50 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      ),

    passwordConfirm: z.string(),

    phoneNo: z
      .string({
        required_error: "phone number is required",
        invalid_type_error: "phone number needs to be a string",
      })
      .min(13, "input phone number in 234 format")
      .max(13),

      isAdmin: z.boolean().default(false),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


const loginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email needs to be a string",
    })
    .email(),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password needs to be a string",
    })
    .min(8, "password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
});

const cakeSchema = z.object({

    cakeName: z.string({
        required_error: "cake name is required",
        invalid_type_error: "name needs to be a string",
    })
    .trim()
    .max(50, "Cake name should not excede 50 characters"),

    category: z.string({
        required_error: "category is required",
        invalid_type_error: "category needs to be a string",
    }),

    description: z.string().nullable(),

    image: z.string({
        required_error: "cake image is required",
        invalid_type_error: "image needs to be a url string",
    }).url(),

    flavour: z.string({
        required_error: "category is required",
        invalid_type_error: "category needs to be a string",
    }),

    price: z.string().refine(value => {
        const regex = /^(\d{1,3}(,\d{3})*|\d+)(\.\d{1,2})?$/;
        return regex.test(value);
      }, {
        message: 'Invalid price format',
      }),

    // price: z.string().refine(value => {
    //     const numberValue = Number(value);
    //     return (
    //       !isNaN(numberValue) &&
    //       numberValue >= 0 &&
    //       numberValue <= 1000000 &&
    //       numberValue.toFixed(2) === value
    //     );
    //   }, 'Invalid decimal precision or numeric range'),

    cakeID: z.number().nullable(),
    userID: z.string().nullable(),
    rating: z.number().min(1).max(5, 'rating cannot exceed 5').nullable(),
    comments: z.string().min(10).nullable(),
    numReviews: z.number().nullable()

})

const categorySchema = z.object({
    categoryName: z.string({
        required_error: "name is required",
        invalid_type_error: "name needs to be a string",
    }).max(50),
    categoryID: z.number().nullish()
})

const orderItemsSchema = z.object({
    itemName: z.string(),
    size: z.string(),
    quantity: z.string(),
    price: z.number(),
});

export type ItemsValidationType = z.infer<typeof orderItemsSchema>;


const orderSchema = z.object({
    orderID: z.number(),
    total: z.number(),
    status: z.string(),
    deliveryPhoneNo: z.string(),
    deliveryAddress: z.string(),
    deliveryState: z.string(),
    deliveryLga: z.string(),
    additionalInfo: z.string().nullable(),
});

export type OrderValidationType = z.infer<typeof orderSchema>;




export const validationSchemas = { signupSchema, loginSchema, cakeSchema, categorySchema, orderItemsSchema, orderSchema}



// userAddress: z
// .string({
//   required_error: "address is required",
//   invalid_type_error: "only strings accepted",
// })
// .min(10)
// .max(150),

// userLga: z.string({
// required_error: "lga is required",
// }),

// userState: z.string({
// required_error: "state is required",
// }),
