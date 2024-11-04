import z from "zod"

const newTabSchema = z.object({
    title : z.string(),
    keyword : z.string(),
    description : z
                  .string()
                  .min(40,{message : "description must alteast of 80 words"})
                  .max(1500,{message : "description must not exceeds this 1200 words"}),
    link : z.string(),
})

export {
    newTabSchema
}