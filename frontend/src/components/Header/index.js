import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/logo-horizontal.svg';
import { Container, Content, Separator } from './styles';

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
          <div>
            <img src={logo} alt="Gympoint" />

            <Separator />

            <NavLink
              to="/student"
              activeClassName="chosen"
              exact={false}
              strict={false}
            >
              ALUNOS
            </NavLink>
            <NavLink to="/plan" activeClassName="chosen" exact={false}>
              PLANOS
            </NavLink>
            <NavLink to="/registration" activeClassName="chosen" exact={false}>
              MATRÍCULAS
            </NavLink>
            <NavLink to="/help" activeClassName="chosen" exact={false}>
              PEDIDOS DE AUXÍLIO
            </NavLink>
          </div>

          <aside>
            <p>{profile.name}</p>

            <p onClick={handleSignOut}>sair do sistema</p>
          </aside>
        </nav>
      </Content>
    </Container>
  );
}
