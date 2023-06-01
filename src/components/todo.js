import '../css/todo.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.todos.length; i++) {
    let t = props.todos[i];
    lis.push(
      <div key={t.id}>
        <input type="checkbox" />
        <a
          id={t.id}
          href={'/read/' + t.id}
          onClick={event => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}>
          {t.title}
        </a>
      </div>,
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
  // const [isEdit, setIsEdit] = useState(false);
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [
        { id: 1, title: 'Study HTML', body: 'Study html ...' },
        { id: 2, title: 'Study CSS', body: 'Study css ...' },
        { id: 3, title: 'Study JavaScript', body: 'Study javascript ...' },
      ];
    }
  });

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);
  
  // useEffect(()=>{
  //   const localList = localStorage.getItem('todos');
  //   if(localList) localStorage.setItem(JSON.parse(localList)); //최초 렌더링 시 로컬스토리지에 저장된 값이 있으면 리스트에 셋한다.
  // },[])

  // console.log(todos);

  let content = null;
  let contextControl = null;

  if (mode === 'none') {
    content = null;
  } else if (mode === 'read') {
    let title,
      body = null;
    for (let i = 0; i < todos.length; i++) {
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
            setMode('update');
          }}>
          Update
        </button>
        <button
          onClick={() => {
            const newTopics = [];
            for (let i = 0; i < todos.length; i++) {
              if (todos[i].id !== id || todos[i].ckb !== true) {
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
  } else if (mode === 'create') {
    content = (
      <Create
        onCreate={(inputTitle, inputBody) => {
          const newTopic = { id: nextId, title: inputTitle, body: inputBody };
          const newTopics = [...todos];
          newTopics.push(newTopic);
          setTodos(newTopics);
          setMode('read');
          setId(nextId);
          setNextId(nextId + 1);
        }}></Create>
    );
  } else if (mode === 'update') {
    let title,
      body = null;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        title = todos[i].title;
        body = todos[i].body;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        // onClick={event => {
        //   setIsEdit(true);
        // }}
        onUpdate={(inTitle, inBody) => {
          // console.log(inTitle, inBody);
          const newTopics = [...todos];
          const updatedTopic = { id: id, title: inTitle, body: inBody };
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
      <div className="controller">
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
            setMode('create');
          }}>
          Create
        </button>
        {contextControl}
      </div>

      <div className="content-body">{content}</div>
      <hr></hr>
      <h2>To Do List</h2>
      <Nav
        todos={todos}
        onChangeMode={getid => {
          setMode('read');
          setId(getid);
        }}></Nav>
    </div>
  );
}

export default Todo;
