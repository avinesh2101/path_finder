import ReactCircleModal from 'react-circle-modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'react-bootstrap'

const Example = () => {
    return (
      <ReactCircleModal
        backgroundColor="#000000"
        toogleComponent={onClick => (
        
            <Button variant="outline-info" onClick={onClick}> Learn more...</Button>

           
        
        )}
        // Optional fields and their default values
        offsetX={0}
        offsetY={0}
      >
        {(onClick) => (
          <div style={{ backgroundColor: '#fff', padding: '1em' ,textAlign:'center'}}>
            
            <br></br>

            <h1>What the hell is Dijkstra ??🙄</h1>
            <p>Dijkstra's algorithm is used for finding the shortest paths between nodes in a 
            graph, which can represent road networks,flight networks and have many application like in <i>IP routing,Social Networking Applications,Digital Mapping Services in Google Maps.....etc etc.</i>
            <b>Dijkstra's Algorithm is guaranteed to find a shortest path from the starting point to the goal, as long as none of the edges have a negative cost</b>
            for its implementation and use in problem solving with refer my code  <a href="https://github.com/avinesh2101/Graph-and-related-stuff.git">(go read some good articles and books🥱)</a></p>
            
            <br></br>
            <p>
            <h1>What is this application all about💻</h1>
             This application visualizes
 <b> Dijkstra Algorithm </b>in action.The algorithms on this application are adapted for a 2D grid, 
where 90 degree turns have a "cost" of 1 and movements from a node to 
another have a "cost" of 1.
<b>Purpose of this application -</b> The sole purpose of this application is to 
 {/* showcase my development skills */}
   help student easily understand dijkstra algorithm by watching its working and some real life examples.
            </p>

            <br></br>


            <button onClick={onClick}>
            <Button>Click here to go back..</Button>
              
            </button>
          </div>
        )}
      </ReactCircleModal>
    )
  }
  
  export default Example