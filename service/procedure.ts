import { Procedure } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"

export const search = async (query: string):Promise<Procedure[]> => {
    return (await axiosInstance.get<Procedure[]>(ApiRoutes.SEARCH_PROCEDURE, {params: {query}})).data;
}