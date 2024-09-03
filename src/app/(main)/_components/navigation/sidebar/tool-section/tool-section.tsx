import { SearchItem } from './search-item';
import { NewPostItem } from './new-post-item';
import { SettingsItem } from './settings-item';

export const ToolSection = async () => {
  return (
    <section className='mx-2 mb-6'>
      <SearchItem />
      <NewPostItem />
      <SettingsItem />
    </section>
  );
};
