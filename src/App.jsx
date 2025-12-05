import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './componentes/telas/Home';
import Sobre from './componentes/telas/Sobre';
import Projeto from './componentes/telas/projeto/Projeto';
import Tarefa from './componentes/telas/tarefa/Tarefa';
import Pomodoro from './componentes/telas/pomodoro/Pomodoro';
import Login from './componentes/telas/login/Login';
import Cadastro from './componentes/telas/usuario/Cadastro';
import Perfil from './componentes/telas/usuario/Perfil';
import Usuario from './componentes/telas/usuario/Usuario';
import MenuPublico from './componentes/MenuPublico';
import MenuPrivado from './componentes/MenuPrivado';

const router = createBrowserRouter([
  {
    path : "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "/sobre",
        element : <Sobre/>
      }	,  
      {
        path : "login",
        element :  <Login/>
      },
      {
        path : "cadastro",
        element :  <Cadastro/>
      }              
    ]
  }
  ,
  {
    path: "/privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path : "sobre",
        element : <Sobre/>
      },  
      {
        path: "projetos",
        element: <Projeto />,
      },
      {
        path: "tarefas",
        element: <Tarefa />,
      },
      {
        path: "pomodoro",
        element: <Pomodoro />,
      },
      {
        path: "perfil",
        element: <Perfil />,
      },
      {
        path: "usuarios",
        element: <Usuario />,
      }
    ]
  }
])

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;