import { z } from "zod";

export const createConcursoSchema = z.object({
    name: z
        .string()
        .min(1, "O campo 'Nome do concurso' é obrigatório")
        .min(3, "O campo 'Nome do concurso' deve ter pelo menos 3 caracteres")
        .max(40, "O campo 'Nome do concurso' deve ter até 40 caracteres"),

    examining_board: z
        .string()
        .optional(),

    weekly_hours: z
        .number()
        .int("O campo 'Horas semanais' deve ser um número inteiro")
        .min(1, "O campo 'Horas semanais' deve ser pelo menos 1")
        .max(70, "O campo 'Horas semanais' deve ser até 70"),

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