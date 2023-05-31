import '../css/todo.css';
import { useState } from 'react';

// function Header(props) {
//   // console.log("props", props.title);
//   return (
//     <header>
//       <h1>
//         <a
//           href="/"
//           onClick={event => {
//             event.preventDefault();
//             props.onChangeMode();
//           }}>
//           {props.title}
//         </a>
//       </h1>
//     </header>
//   );
// }

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.todos.length; i++) {
    let t = props.todos[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={'/read/' + t.id}
          onClick={event => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}>
          {t.title}
        </a>
      </li>,
    );
  }
  return (
    <nav>
      <ul>{lis}</ul>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Add Items</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          if (title !== '' || body !== '') {
            props.onCreate(title, body);
          }
        }}>
        <p>
          <input type="text" name="title" placeholder="제목" />
        </p>
        <p>
          <textarea name="body" placeholder="추가 내용"></textarea>
        </p>
        <p>
          <input type="submit" value="ADD!"></input>
        </p>
      </form>
    </article>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onUpdate(title, body);
        }}>
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={event => {
              setBody(event.target.value);
            }}></textarea>
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>
    </article>
  );
}

function Todo() {
  const [mode, setMode] = useState('none');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [todos, setTodos] = useState([
    { id: 1, title: 'Study HTML', body: 'Study html ...' },
    { id: 2, title: 'Study CSS', body: 'Study css ...' },
    { id: 3, title: 'Study JavaScript', body: 'Study javascript ...' },
  ]);
  let content = null;
  let contextControl = null;
  if (mode === 'none') {
    content = null;
  } else if (mode === 'read') {
    let title,
      body = null;
    for (let i = 0; i < todos.length; i++) {
      // console.log(todos[i].id, id);
      if (todos[i].id === id) {
        title = todos[i].title;
        body = todos[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    contextControl = (
      <>
        <button
          href={'/update/' + id}
          onClick={event => {
            event.preventDefault();
            setMode('UPDATE');
          }}>
          Update
        </button>
        <button
          onClick={() => {
            const newTopics = [];
            for (let i = 0; i < todos.length; i++) {
              if (todos[i].id !== id) {
                newTopics.push(todos[i]);
              }
            }
            setTodos(newTopics);
            setMode('WELCOME');
          }}>
          Delete
        </button>
      </>
    );
  } else if (mode === 'CREATE') {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...todos];
          newTopics.push(newTopic);
          setTodos(newTopics);
          setMode('read');
          setId(nextId);
          setNextId(nextId + 1);
        }}></Create>
    );
  } else if (mode === 'UPDATE') {
    let title,
      body = null;
    for (let i = 0; i < todos.length; i++) {
      // console.log(todos[i].id, id);
      if (todos[i].id === id) {
        title = todos[i].title;
        body = todos[i].body;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          // console.log(title, body);
          const newTopics = [...todos];
          const updatedTopic = { id: id, title: title, body: body };
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === id) {
              newTopics[i] = updatedTopic;
              break;
            }
          }
          setTodos(newTopics);
          setMode('read');
        }}></Update>
    );
  }

  return (
    <div className="App">
      <h1>TODO Lists</h1>
      <button
        onClick={event => {
          event.preventDefault();
          setMode('none');
        }}>
        Close
      </button>
      <button
        href="/create"
        onClick={event => {
          event.preventDefault();
          setMode('CREATE');
        }}>
        Create
      </button>
      {contextControl}
      {content}
      <h2>To Do List</h2>
      <Nav
        todos={todos}
        onChangeMode={_id => {
          setMode('read');
          setId(_id);
        }}></Nav>
    </div>
  );
}

export default Todo;
