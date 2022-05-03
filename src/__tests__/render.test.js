import {cleanup, screen, render, act} from '@testing-library/react';
import { BrowserRouter as Router, Router as DefaultRouter} from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import AllResults from '../pages/AllResults';
import CreateRace from '../pages/CreateRace';
import RaceHorses from '../pages/RaceHorses';
import RaceResults from '../pages/RaceResults';
import Races from '../pages/Races';

afterEach(cleanup);

const horses = [
  {
    id: 1, 
    name: "testhorse",
    color: "sinine",
    runTime: "5.43s",
    betOn: true,
    winner: false
  },
  {
    id: 2, 
    name: "secondtesthorse",
    color: "kollane",
    runTime: "6.82",
    betOn: false,
    winner: true 
  }
]

test('Renders all results title', () => {
  render(
    <Router>
      <AllResults />
    </Router>);
  const linkElement = screen.getByText(/All results/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders create race title', () => {
  render(
    <Router>
      <CreateRace />
    </Router>
  );
  const linkElement = screen.getByText(/Create race!/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders race horses title', () => {
  const history = createMemoryHistory();
  const state = { location: "Paide", time: "03-05-2022"}
  history.push("/horses", state);

  render(
    <DefaultRouter location={history.location}>
      <RaceHorses />
    </DefaultRouter>
  );
  const linkElement = screen.getByText(/Add horses/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders race results title', () => {
  const history = createMemoryHistory();
  const state = { current: {
    race: "testRace", 
    horses: horses
  }}
  history.push("/raceresults", state);

  render(
    <DefaultRouter location={history.location}>
      <RaceResults />
    </DefaultRouter>);
  
  const linkElement = screen.getByText(/secondtesthorse/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders races title', () => {
  render(
    <Router>
      <Races />
    </Router>
  );
  const linkElement = screen.getByText(/All races/i);
  expect(linkElement).toBeInTheDocument();
});
