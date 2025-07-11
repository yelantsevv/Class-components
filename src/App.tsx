import { Component } from 'react';
import { CardList, ErrorButton, Header, Spinner } from './components';
import { getData, URL } from './api';
import type { Person, State } from './types/types';
import styles from './App.module.css';

export default class App extends Component {
  state: State = {
    isLoading: true,
    onSearch: async (e) => {
      this.setState({ isLoading: true });
      this.setState(await getData<Person>(`${URL}?search=${e}`));
      this.setState({ isLoading: false, page: 1 });
    },
    pageLink: async (page) => {
      this.setState({ isLoading: true });
      this.setState(await getData<Person>(page));
      this.setState({ isLoading: false });
    },
  };
  componentDidMount() {
    this.state.onSearch(localStorage.getItem('search') ?? '');
  }

  render() {
    return (
      <div className={styles.app}>
        <Header {...this.state} />
        <CardList {...this.state} />
        {this.state.isLoading && <Spinner />}
        <ErrorButton />
      </div>
    );
  }
}
