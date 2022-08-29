import { FC } from "react";

import styles from "./settings.module.scss";
import Loader from "../../components/UI/Loader";
import PageTitle from "../../components/UI/PageTitle";
import SettingsForm from "../../features/settings/components/SettingsForm";
import {
  useGetSettingsQuery,
  useSaveSettingsMutation,
} from "../../features/settings/services/slice";

const Settings: FC = () => {
  const { isLoading } = useGetSettingsQuery();
  const [_, { isLoading: isUpdating }] = useSaveSettingsMutation();

  return isLoading || isUpdating ? (
    <Loader />
  ) : (
    <div className={`${styles.settingsBody} container`}>
      <PageTitle>Settings</PageTitle>
      <h4 className={styles.subtitle}>Configure App settings.</h4>
      <div className={styles.settingsPanel}>
        <SettingsForm />
      </div>
    </div>
  );
};

export default Settings;
