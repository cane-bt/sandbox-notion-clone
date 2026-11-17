import type React from 'react';
import { useState } from 'react';
import type { IconType } from 'react-icons';
import {
  FiChevronRight,
  FiFile,
  FiMoreHorizontal,
  FiPlus,
  FiTrash2,
} from 'react-icons/fi';

import type { Note } from '../../modules/notes/note.entity';
import Item from '../SideBar/Item';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Props {
  note: Note;
  onCreate?: (event: React.MouseEvent) => void;
  onExpand?: (event: React.MouseEvent) => void;
  layer?: number;
}

export default function NoteItem({
  note,
  onCreate,
  onExpand,
  layer = 0,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (): IconType => {
    return isHovered ? FiChevronRight : FiFile;
  };

  const menu = (
    <div className="note-item-menu-container">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="note-item-menu-button" role="button">
            <FiMoreHorizontal className="note-item-menu-icon" size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="note-item-dropdown"
          align="start"
          side="right"
          forceMount
        >
          <DropdownMenuItem onClick={() => {}}>
            <FiTrash2 className="note-item-delete-icon" size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="note-item-menu-button" role="button" onClick={onCreate}>
        <FiPlus className="note-item-menu-icon" size={16} />
      </div>
    </div>
  );

  return (
    <div
      role="button"
      style={{ paddingLeft: `${layer * 12 + 12}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Item
        label={note.title ?? '無題'}
        icon={getIcon()}
        trailingItem={menu}
        onIconClick={onExpand}
      />
    </div>
  );
}
