'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
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
  {
    id: 3,
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 4,
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  static getPriorityName(priorityId) {
    let valuesPriorityType = Object.values(PRIORITY_TYPES);
    let idPriorities = Notepad.PRIORITIES[priorityId].id;

    if (valuesPriorityType.includes(idPriorities)) {
      return Notepad.PRIORITIES[priorityId].name;
    }
  }

  findNoteById(id) {
    for (let note of this._notes) {
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
      let note = this._notes[i];
      if (note.id === Number(id)) {
        return this._notes.splice(i, 1);
      }
    }
  }

  updateNoteContent(id, updatedContent) {
    let note = this.findNoteById(id);
    let updateNoteContent = Object.keys(updatedContent);
    for (const key of updateNoteContent) {
      note[key] = updatedContent[key];
      return note;
    }
  }

  updateNotePriority(id, priority) {
    let note = this.findNoteById(id);
    if (!note) {
      return;
    }
    note.priority = priority;
    return note;
  }

  filterNotesByQuery(query) {
    const filteredNote = [];
    for (let i = 0; i < this._notes.length; i += 1) {
      let { title, body } = this._notes[i];
      let note = `${title} ${body}`;
      let resultNote = note.toLowerCase().includes(query.toLowerCase());
      if (resultNote) {
        filteredNote.push(this._notes[i]);
      }
    }
    return filteredNote;
  }

  filterNotesByPriority(priority) {
    let filteredNotesOnPriority = [];
    let notes = this.notes;
    for (let note of notes) {
      if (note.priority === priority) {
        filteredNotesOnPriority.push(note);
      }
    }
    return filteredNotesOnPriority;
  }
}

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: 'Low' },
  1: { id: 1, value: 1, name: 'Normal' },
  2: { id: 2, value: 2, name: 'High' },
};

const notepad = new Notepad(initialNotes);

const createNoteContent = (title, body) => {
  const contentBox = document.createElement('div');
  contentBox.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;

  contentBox.append(noteTitle, noteBody);

  return contentBox;
};

const createActionButton = (content, button) => {
  const action = document.createElement('button');
  action.classList.add('action');
  action.setAttribute('data-action', button);

  const buttonIcons = document.createElement('i');
  buttonIcons.classList.add('material-icons');
  buttonIcons.classList.add('action__icon');
  buttonIcons.textContent = content;
  action.appendChild(buttonIcons);

  return action;
};

const createNoteFooter = priority => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  const noteSection1 = document.createElement('section');
  noteSection1.classList.add('note__section');
  noteFooter.appendChild(noteSection1);

  const noteSection2 = document.createElement('section');
  noteSection2.classList.add('note__section2');
  noteSection1.appendChild(
    createActionButton('expand_more', ICON_TYPES.DECREASE_PRIORITY)
  );
  noteSection1.appendChild(
    createActionButton('expand_less', ICON_TYPES.INCREASE_PRIORITY)
  );

  const p = document.createElement('p');
  noteSection1.appendChild(p);
  p.classList.add('note__priority');
  p.textContent = `Priority ${Notepad.getPriorityName(priority)}`;
  noteFooter.appendChild(noteSection2);
  noteSection2.appendChild(createActionButton('edit', ICON_TYPES.EDIT));
  noteSection2.appendChild(createActionButton('delete', ICON_TYPES.DELETE));

  return noteFooter;
};

const createListItem = ({ id, title, body, priority }) => {
  const noteListItem = document.createElement('li');
  noteListItem.dataset.id = id;
  noteListItem.classList.add('note-list__item');

  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');
  noteListItem.appendChild(noteDiv);
  noteDiv.appendChild(createNoteContent(title, body));
  noteDiv.appendChild(createNoteFooter(priority));

  return noteListItem;
};

const listRef = document.querySelector('.note-list');

const renderNoteList = (listRef, notes) => {
  const renderListItem = notes.map(note => createListItem(note));
  listRef.innerHTML = '';
  listRef.append(...renderListItem);

  return listRef;
};

renderNoteList(listRef, notepad.notes);

const form = document.querySelector('.note-editor');
const titleInput = form.querySelector('input');
const bodyInput = form.querySelector('textarea');

const generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const handleSubmit = evt => {
  evt.preventDefault();
  const newtitle = titleInput.value.trim();
  const newbody = bodyInput.value.trim();

  if (newtitle === '' || newbody === '') {
    return alert('Необходимо заполнить все поля!!!');
  }
  const newItem = {
    id: `${generateUniqueId()}`,
    title: `${newtitle}`,
    body: `${newbody}`,
    priority: PRIORITY_TYPES.LOW,
  };
  notepad.saveNote(newItem);
  form.reset();
  addListItem(listRef, newItem);
};

form.addEventListener('submit', handleSubmit);

const addListItem = (listRef, note) => {
  const renderNewListItem = createListItem(note);
  listRef.append(renderNewListItem);
};

const inputSearchForm = document.querySelector('.search-form__input');

const curentInputValue = evt => {
  const target = evt.target;
  const searchedItem = notepad.filterNotesByQuery(target.value);
  listRef.innerHTML = '';
  renderNoteList(listRef, searchedItem);
};

const search = evt => {
  const target = evt.target;
  target.oninput = curentInputValue;
};

inputSearchForm.addEventListener('focus', search);

const handleRemoveNote = evt => {
  const target = evt.target;
  const nodeName = target.nodeName;
  const action = target.textContent;
  if (action !== 'delete') return;
  let parent = target.closest('.note-list__item');
  notepad.deleteNote(parent.dataset.id);
  parent.remove();
  console.log(parent);
};

listRef.addEventListener('click', handleRemoveNote);
