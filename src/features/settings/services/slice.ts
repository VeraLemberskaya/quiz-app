import { apiSlice } from "../../../services/apiSlice";
import { Settings, SettingsValues } from "./types";

const transformResponse = (response: Settings) => {
  return {
    ...response,
    topics: response.topics.sort((topic1, topic2) => {
      return topic1.name.charCodeAt(0) - topic2.name.charCodeAt(0);
    }),
  };
};

export const settingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<Settings, void>({
      query: () => "/settings",
      transformResponse: (response: Settings) => transformResponse(response),
      providesTags: ["Settings"],
    }),
    saveSettings: builder.mutation<Settings, SettingsValues>({
      query: (updatedSettings) => ({
        url: `/settings`,
        method: "PUT",
        body: updatedSettings,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const { useGetSettingsQuery, useSaveSettingsMutation } =
  settingsApiSlice;

export const selectSettingsResult =
  settingsApiSlice.endpoints.getSettings.select();
