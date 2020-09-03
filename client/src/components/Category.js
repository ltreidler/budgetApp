import React from 'react';
import {Line} from 'rc-progress';
export default function({label, spent, max, percent, color}) {
    return (<div class="row">
        <div class="col s12 m12">
          <div class={"card-panel"+color+"darken-4"}>
            <span class="white-text">{label}: {spent} / {max} </span>
            <Line percent={spent/max} strokeWidth="3" trailWidth="3" strokeColor="#2196f3" trailColor="#b3f2fd"/>
          </div>
        </div>
      </div>);
}