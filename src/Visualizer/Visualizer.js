import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algo/dijkstra';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,Button, Navbar ,Nav,Form,FormControl} from 'react-bootstrap'
import './Visualizer.css';
import Example from '../components/popup';

let a = Math.floor(Math.random() * (5 - 1) + 5);
let b = Math.floor(Math.random() * (10 - 1) + 10);
let c = Math.floor(Math.random() * (10 - 1) + 10);
let d = Math.floor(Math.random() * (30- 10) + 30);

console.log(a); 

const START_NODE_ROW = a;
const START_NODE_COL = b;
const FINISH_NODE_ROW = c;
const FINISH_NODE_COL = d;

export default class Visualizer extends Component {

  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
{/* navbar starts  */}
    <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand  className=" " href="#home">Visualizer</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#footer">How to use!!</Nav.Link>

      <Nav.Link href=" onClick={() => window.location.reload(false)">
      Randomly Place Nodes 
      </Nav.Link>
    
    </Nav>

    <Form inline>
    <div className='mr-3'>
    <Button  onClick={() => this.visualizeDijkstra()}> Visualize Dijkstra's Algorithm </Button>
    </div>
    <Button variant="outline-info" onClick={() => window.location.reload(false)}>  Clear BOX</Button>
    </Form>  
  </Navbar>
{/* navbar ends */}



{/* grid section main */}
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}

        </div>
        {/* grid section ends */}

{/* footer */}
<footer>
 {/* how to use section */}
 <Card>
  <Card.Header  className="blockquote mb-0" >How to use!!! </Card.Header>

  <Card.Body>
    <blockquote >
      <p>
        {' '}
         Generate Walls - Click on grid to generate  walls .
         <br></br>
         Click on Visualize to generate shortes path.


        {' '}
      </p>
      <Example></Example>
      <footer id="footer">
        Made with 💖 by <a href="https://github.com/avinesh2101">Avinesh Pandey</a>.
      </footer>
      
    </blockquote>
  </Card.Body>

</Card>
{/* ends */}
</footer>
{/* footer ends */}

      </>
    );
  }

}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
