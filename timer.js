1. Break the app into components
2. Build a static version of the app
3. Determine what should be stateful
4. Determine in which component each piece of state should live
5. Hard-code initial states
6. Add inverse data flowComponents 71
7. Add server communication

import React, { useState } from "react";
import "./styles.css";

export function Timer(props) {
  const elapsedString = helpers.renderElapsedString(props.elapsedString);
  return (
    <div className="ui centered card">
      <div className="content">
        <div className="header">{props.title}</div>
        <div className="meta">
          <div>{props.project}</div>
        </div>
        <div className="extra content">
          <span className="right floated edit icon" onClick={() => props.onEditClick()}>
            <i className="edit icon"></i>
          </span>
          <span className="right floated trash icon">
            <i className="trash icon"></i>
          </span>
        </div>
      </div>
      <div className="ui bottom attached blue basic button">Start</div>
    </div>
  );
}

export function ToggleableTimerForm(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleFormSubmit() {
    setIsOpen((val) => !val);
  }

  if (isOpen) {
    return <TimerForm onFormSubmit={handleFormSubmit} onFormClose={() => setIsOpen((val) => !val)} />;
  } else {
    return (
      <div className="ui basic content center aligned segment">
        <button className="ui basic button icon" onClick={() => setIsOpen((val) => !val)}>
          <i className="plus icon"></i>
        </button>
      </div>
    );
  }
}

export function TimerForm(props) {
  const submitText = props.title ? "Update" : "Create";

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onFormSubmit({
      id,
      title,
      project,
    })
  }

  return (
    <ui className="centered card">
      <div className="content">
        <form className="ui form" onSubmit={(e) => handleSubmit(e)}>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value.trim())}
            />
          </div>
          <div className="field">
            <label htmlFor="project">Project</label>
            <input
              type="text"
              id="project"
              name="project"
              value={project}
              onChange={(e) => setProject(e.target.value.trim())}
            />
          </div>
          <div className="ui two bottom attached buttons">
            <button className="ui basic blue button" type="submit">
              {submitText}
            </button>
            <button className="ui basic red button" onClick={() => props.onFormClose()}>Cancel</button>
          </div>
        </form>
      </div>
    </ui>
  );
}

export function EditableTimer(props) {
  const [editFormOpen, setEditFormOpen] = useState(false);

  if (editFormOpen) {
    return <TimerForm title={props.title} project={props.project} />;
  } else {
    return (
      <Timer
        title={props.title}
        project={props.project}
        elapsed={props.elapsed}
        runningSince={props.runningSince}
      />
    );
  }
}

export function EditableTimerList(props) {
  const timers = props.timers.map((timer) => (
    <EditableTimer
      title={timer.title}
      project={timer.project}
      elapsed={timer.elapsed}
      runningSince={timer.runningSince}
    />
  ))

  return (
    <div id="timers">{timers}</div>
  );
}

export function TimerDashboard() {
  const [timers, setTimers] = useState([
    {
      title: "Practice squat",
      project: "Gym Chores",
      id: uuid.v4(),
      elapsed: 545609,
      runningSince: Date.now(),
    },
    {
      title: "Bake squash",
      project: "Kitchen Chores",
      id: uuid.v4(),
      elapsed: 1273998,
      runningSince: null,
    },
  ]);

  function handleCreateFormSubmit(timer) {

  }

  function createTimer(timer) {
    const t = helpers.newTimer(timer);

    setTimers((timers) => ({ ...timers, t }))
  }

  return (
    <div className="ui three-column centered grid">
      <div className="column">
        <EditableTimerList timers={timers} />
        <ToggleableTimerForm isOpen={true} />
      </div>
    </div>
  );
}

export default function App() {
  return <TimerDashboard />;
}
