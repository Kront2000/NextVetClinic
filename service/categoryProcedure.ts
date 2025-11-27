import { CategoryProcedure } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants";

export const search = async ():Promise<CategoryProcedure[]> => {
    return (await axiosInstance.get<CategoryProcedure[]>(ApiRoutes.SEARCH_CATEGORY_PROCEDURE)).data;
}

