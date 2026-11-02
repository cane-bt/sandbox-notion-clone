import { FiPlus, FiSearch } from 'react-icons/fi';

import NoteList from '../NoteList';
import Item from './Item';
import UserItem from './UserItem';

export default function SideBar() {
  return (
    <>
      <aside className='sidebar'>
        <div>
          <div>
            <UserItem />
            <Item
              label='検索'
              icon={FiSearch}
              onClick={() => {}}
            />
          </div>
          <div className='sidebar-spacer'>
            <NoteList />
            <Item label='ノートを作成' icon={FiPlus} onClick={() => {}} />
          </div>
        </div>
      </aside>
      <div className='sidebar-placeholder'></div>
    </>
  );
}
