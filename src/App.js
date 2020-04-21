import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(){
    super()

    this.state = {
      tanks: [],
      name: '',
      gun: {
        production: '',
        modified: null
      },
      crew: null,
      lovedByScott: false,
      img: '',
      coolTankRating: null,
      wars: [],
      search: ''
    }
    this.handleUpdateSearch = this.handleUpdateSearch.bind(this)
    this.searchTanks = this.searchTanks.bind(this)
  }

  componentDidMount(){
    axios.get('/api/tanks')
      .then(res => {
        console.log(res.data)
        this.setState({
          tanks: res.data
        })
      })
      .catch(err => console.log(err))
  }

  handleUpdateSearch(val){
    this.setState({
      search: val
    })
  }

  searchTanks(){
    axios.get(`/api/tanks?search=${this.state.search}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          tanks: res.data
        })
      })
      .catch(err => console.log(err))
  }

  handleUpdateName = val => {
    this.setState({
      name: val
    })
  }
  handleUpdateGun = val => {
    this.setState({
      gun: {
        production: val
      }
    })
  }
  handleUpdateCrew= val => {
    this.setState({
      crew: val
    })
  }
  handleUpdateImage = val => {
    this.setState({
      img: val
    })
  }
  handleUpdateCoolTankRating = val => {
    this.setState({
      coolTankRating: val
    })
  }
  handleUpdateWars = val => {
    const wars = val.split(',')
    this.setState({
      wars
    })
  }

  handleAddTank = () => {
    const {name, gun, crew, lovedByScott, coolTankRating, img, wars} = this.state
    this.setState({
      tanks: [...this.state.tanks, {
        name,
        gun,
        crew,
        lovedByScott,
        coolTankRating,
        img, 
        wars
      }]
    })

    this.setState({
      name: '',
      gun: {
        production: '',
        modified: null
      },
      crew: 0,
      lovedByScott: false,
      img: '',
      coolTankRating: 0,
      wars: []
    })
  }
  
  render(){
    console.log(this.state)

    const tanksDisplay = this.state.tanks.map(tank => {
      // console.log(tank)
      return <div className='tank-info'>
        <div id='title-pic'>
          <h1>{tank.name}</h1> <img className='tank-image' src={tank.img} />
        </div>

        <p>{tank.gun.production}</p>
        <p>{tank.crew}</p>
        <p>Scott loves it: {tank.lovedByScott ? 'True' : 'Nope'}</p>
        <p>On a scale of Sick-Nasty to Laaaaaame this tank is a {tank.coolTankRating}</p>    
        <p>{tank.wars.map(e => <span className='war'>{e}, </span>)} </p>   
      </div>
    })


    return (
    <main>
      <h1>Scott's Legendary Tank Builder</h1>

      <input
      placeholder='Search Here'
      onChange={e => this.handleUpdateSearch(e.target.value)}/>

      <button onClick={this.searchTanks}>Search Tanks</button>

      <section>
        <input 
        placeholder='Name'
        onChange={e => this.handleUpdateName(e.target.value)}
        value={this.state.name}/>
        <input 
        placeholder='Gun'
        onChange={e => this.handleUpdateGun(e.target.value)}
        value={this.state.gun.production}/>
        <input 
        placeholder='Crew'
        onChange={e => this.handleUpdateCrew(e.target.value)}
        type='number'
        value={this.state.crew}/>
        <input 
        placeholder='Sick tank pic'
        onChange={e => this.handleUpdateImage(e.target.value)}
        value={this.state.img}/>
        <input 
        placeholder='How cool is it?'
        onChange={e => this.handleUpdateCoolTankRating(e.target.value)}
        type='number'
        value={this.state.coolTankRating}/>
        <input 
        placeholder='Wars (Separate by comma)'
        onChange={e => this.handleUpdateWars(e.target.value)}
        />

        <button onClick={() => this.handleAddTank()}>Add Tank</button>
      </section>
      

      <div id='tanks-display'>
        {tanksDisplay}
      </div>
    </main>
  );
  }
  
}

export default App;
