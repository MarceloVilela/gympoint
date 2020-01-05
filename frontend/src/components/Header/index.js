import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  MdPersonOutline,
  MdEvent,
  MdCardMembership,
  MdHelpOutline,
  MdExitToApp,
} from 'react-icons/md';

import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/logo-horizontal.svg';
import { Container, Content } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <article>
            <section>
              <img src={logo} alt="Gympoint" />
            </section>

            <section>
              <NavLink
                to="/student"
                activeClassName="chosen"
                exact={false}
                strict={false}
              >
                <span>ALUNOS</span>
                <MdPersonOutline />
              </NavLink>
              <NavLink to="/plan" activeClassName="chosen" exact={false}>
                <span>PLANOS</span>
                <MdEvent />
              </NavLink>
              <NavLink
                to="/registration"
                activeClassName="chosen"
                exact={false}
              >
                <span>MATRÍCULAS</span>
                <MdCardMembership />
              </NavLink>
              <NavLink to="/help" activeClassName="chosen" exact={false}>
                <span>PEDIDOS DE AUXÍLIO</span>
                <MdHelpOutline />
              </NavLink>
            </section>
          </article>

          <aside>
            <p>{profile.name}</p>

            <button type="button" className="warning" onClick={handleSignOut}>
              <span>sair do sistema</span>
              <MdExitToApp />
            </button>
          </aside>
        </nav>
      </Content>
    </Container>
  );
}
