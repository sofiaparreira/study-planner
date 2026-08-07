import { z } from "zod";

export const createConcursoSchema = z.object({
    name: z
        .string()
        .min(1, "Nome é obrigatório")
        .min(3, "Nome deve ter pelo menos 3 caracteres"),

    examining_board: z
        .string()
        .optional(),

    date: z.preprocess(
        (value) => {
            if (typeof value === "string") {
                const date = new Date(value);

                if (isNaN(date.getTime())) {
                    return undefined;
                }

                return date;
            }

            return value;
        },
        z
            .date({
                error: "Informe uma data válida"
            })
            .refine(
                (date) => date >= new Date(),
                "A data do concurso não pode ser retroativa"
            )
    )
});