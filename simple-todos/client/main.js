import './main.html';
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Players } from './../imports/api/players';
import TitleBar from './../imports/ui/TitleBar';
import PlayerList from './../imports/ui/PlayerList';
import AddPlayer from './../imports/ui/AddPlayer';

Meteor.startup(() => {
  Tracker.autorun(() => {
    const players = Players.find({}, { sort: { score: -1 }}).fetch();
    const title = 'Score Keep';
    const subtitle = 'Created by Ledi Hildawan'

    const jsx = (
      <div>
        <TitleBar
          title={ title }
        />
        <PlayerList players={ players } />
        <AddPlayer />
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });
});