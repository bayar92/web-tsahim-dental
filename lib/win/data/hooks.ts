import { useQuery, useMutation } from "react-query";
import { API, Method } from "@util/query";

export const useCreatePhotoUploadToken = (hospitalId: any, hospitalUserId: any) =>
    useMutation(API._mutate(Method.GET, `win/photo-upload-token?hospitalId=${hospitalId}&hospitalUserId=${hospitalUserId}`));
