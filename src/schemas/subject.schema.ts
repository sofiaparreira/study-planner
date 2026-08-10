import z from "zod";

export const createSubjectSchema = z.object({
    name: z
        .string()
        .min(1, "O campo 'Nome da disciplina' é obrigatório")
        .min(3, "O campo 'Nome da disciplina' deve ter pelo menos 3 caracteres")
        .max(60, "O campo 'Nome da disciplina' deve ter até 60 caracteres"),

    quantity_questions: z
        .number()
        .int("O campo 'Quantidade de questões' deve ser um número inteiro")
        .min(1, "O campo 'Quantidade de questões' deve ser pelo menos 1")
        .max(300, "O campo 'Quantidade de questões' deve ser até 300"),
    points_per_questions: z
        .number()
        .positive("O campo 'Pontos de questão' deve ser maior que 0")
        .max(20, "O cmapo 'Pontos por questão' deve ser no máximo 20")
        .refine(
            (value) => Number.isInteger(value * 100),
            "O campo 'Pontos por questão', deve ter no máximo 2 casas decimais"
        )
})