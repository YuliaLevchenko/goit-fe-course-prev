'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    for (const note of this._notes) {
      if (note.id === id) {
        return note;
      }
    }
  }

  saveNote(note) {
    this._notes.push(note);
  }

  deleteNote(id) {
    for (let i = 0; i < this._notes.length; i += 1) {
      if (this._notes[i].id === id) {
        this._notes.splice(i, 1);
      }
    }
  }

  updateNoteContent(id, updatedContent) {
    const updatedNote = this.findNoteById(id);
    const { title, body } = updatedContent;

    if (!updatedNote) return;

    updatedNote.title = title;
    updatedNote.body = body;

    return updatedNote;
  }

  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    if (!note) return;

    note.priority = priority;

    return note;
  }

  filterNotesByQuery(query) {
    const filtredNotes = [];

    for (const note of this._notes) {
      if (
        (note.title && note.body).toLowerCase().includes(query.toLowerCase())
      ) {
        filtredNotes.push(note);
      }
    }
    return filtredNotes;
  }

  filterNotesByPriority(priority) {
    const filtredNotes = [];

    for (const note of this._notes) {
      if (note.priority === priority) {
        filtredNotes.push(note);
      }
    }
    return filtredNotes;
  }

  static getPriorityName(priorityId) {
    const priorityValues = Object.values(this.PRIORITIES);

    for (const value of priorityValues) {
      if (value.id === priorityId) {
        return value.name;
      }
    }
  }
}

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: 'Low' },
  1: { id: 1, value: 1, name: 'Normal' },
  2: { id: 2, value: 2, name: 'High' },
};

const initialNotes = [
  {
    id: 1,
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 2,
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
];

/*
 * Посмотрим имя приоритета по id
 */
console.log(Notepad.getPriorityName(PRIORITY_TYPES.LOW)); // "Low"
console.log(Notepad.getPriorityName(PRIORITY_TYPES.NORMAL)); // "Normal"
console.log(Notepad.getPriorityName(PRIORITY_TYPES.HIGH)); // "High"

const notepad = new Notepad(initialNotes);

/*
  Смотрю что у меня в заметках после инициализации
*/
console.log('Все текущие заметки: ', notepad.notes);

/*
 * Добавляю еще 2 заметки и смотрю что получилось
 */
notepad.saveNote({
  id: 3,
  title: 'Get comfy with Frontend Frameworks',
  body:
    'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
  priority: PRIORITY_TYPES.NORMAL,
});

notepad.saveNote({
  id: 4,
  title: 'Winter clothes',
  body:
    "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: PRIORITY_TYPES.LOW,
});

console.log('Все текущие заметки: ', notepad.notes);

/*
 * Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority(4, PRIORITY_TYPES.NORMAL);
console.log('Заметки после обновления приоритета для id 4: ', notepad.notes);

/*
 *  Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority(3, PRIORITY_TYPES.LOW);
console.log('Заметки после обновления приоритета для id 3: ', notepad.notes);

/*
 * Решил отфильтровать заметки по слову html
 */
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notepad.filterNotesByQuery('html'),
);

/*
 * Решил отфильтровать заметки по слову javascript
 */
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notepad.filterNotesByQuery('javascript'),
);

/*
 * Хочу посмотреть только заметки с нормальным приоритетом
 */
console.log(
  'Отфильтровали заметки по нормальному приоритету: ',
  notepad.filterNotesByPriority(PRIORITY_TYPES.NORMAL),
);

/*
 * Обновим контент заметки с id 3
 */
notepad.updateNoteContent(3, { title: 'Get comfy with React.js or Vue.js' });
console.log(
  'Заметки после обновления контента заметки с id 3: ',
  notepad.notes,
);

/*
 * Повторил HTML и CSS, удаляю запись c id 2
 */
notepad.deleteNote(2);
console.log('Заметки после удаления с id 2: ', notepad.notes);
