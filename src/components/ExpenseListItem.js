import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = props => (
  <div>
    <h3>
      <Link to={`/edit/${props.id}`}>{props.description}</Link>
    </h3>
    <p>
      {numeral(props.amount / 100).format('$0,0.00')} -
      {moment(props.created).format('MMM Do YYYY')}
    </p>
  </div>
);

// export default connect()(ExpenseListItem);
export default ExpenseListItem;
