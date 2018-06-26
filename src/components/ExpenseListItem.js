import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = props => (
  <Link to={`/edit/${props.id}`} className="list-item">
    <div>
      <h3 className="list-item__title">{props.description}</h3>
      <span className="list-item__subtitle">{moment(props.created).format('MMM Do YYYY')}</span>
    </div>
    <h3 className="list-item__data">{numeral(props.amount / 100).format('$0,0.00')}</h3>
  </Link>
);

// export default connect()(ExpenseListItem);
export default ExpenseListItem;
