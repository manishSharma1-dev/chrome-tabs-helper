import z from "zod";

const searchSchema = z.object({
    tag : z.string()
})

export {
    searchSchema
}