import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import StudentNew from '../pages/Student/Create';
import Student from '../pages/Student/Show';
import StudentEdit from '../pages/Student/Update';

import PlanNew from '../pages/Plan/Create';
import Plan from '../pages/Plan/Show';
import PlanEdit from '../pages/Plan/Update';

import Registration from '../pages/Registration/Show';
import RegistrationEdit from '../pages/Registration/Update';
import RegistrationNew from '../pages/Registration/Create';

import Help from '../pages/Help/Show';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/student.new" component={StudentNew} isPrivate />
      <Route path="/student" component={Student} isPrivate exact />
      <Route path="/student.edit/:id" component={StudentEdit} isPrivate />

      <Route path="/plan.new" component={PlanNew} isPrivate />
      <Route path="/plan" component={Plan} isPrivate exact />
      <Route path="/plan.edit/:id" component={PlanEdit} isPrivate />

      <Route path="/registration.new" component={RegistrationNew} isPrivate />
      <Route path="/registration" component={Registration} isPrivate exact />
      <Route
        path="/registration.edit/:id"
        component={RegistrationEdit}
        isPrivate
        exact
      />

      <Route path="/help" component={Help} isPrivate />
    </Switch>
  );
}
