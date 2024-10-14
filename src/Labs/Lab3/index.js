import React from 'react';
import VariablesAndConstants from './VariableAndConstants';
import VariableTypes from './VariableTypes';
import BooleanVariables from './BooleanVariables';
import Ifelse from './Ifelse';
import TernaryOperator from './TernaryOperator';
import ConditionalOutputIfElse from './ConditionalOutputIfElse';
import ConditionalOutputInline from './ConditionalOutputInline';
import LegacyFunctions from './LegacyFunctions';
import ArrowFunctions from './ArrowFunctions';
import ImpliedReturn from './ImpliedReturn';
import TemplateLiterals from './TemplateLiterials';
import SimpleArrays from './SimpleArrays';
import ArrayIndexAndLength from './ArrayIndexAndLength';
import AddingAndRemovingToFromArrays from './AddingAndRemovingToFromArrays';
import ForLoops from './ForLoops';
import MapFunction from './MapFunction';
import FindFunction from './FindFunction';
import FilterFunction from './FilterFunction';
import FindIndex from './FindIndex';
import JsonStringify from './JsonStringfy';
import House from './House';
import TodoItem from './todos/TodoItem';
import TodoList from './todos/TodoList';
import Spreading from './Spreading';
import Destructing from './Destructing';
import FunctionDestructing from './FunctionDestructing';
import DestructingImports from './DestructingImports';
import Classes from './Classes';
import Styles from './Styles';
import Add from './Add';
import Square from './Square';
import Highlight from './Highlight';
import PathParameters from './PathParameters';
import AddPathParameters from './AddPathParameters';

export default function Lab3(){
    console.log('Hello World!');
    return(
        <div id="wd-lab3">
            <h2>Lab 3</h2>
            <VariablesAndConstants/>
            <VariableTypes />
            <BooleanVariables />
            <Ifelse />
            <TernaryOperator />
            <ConditionalOutputIfElse />
            <ConditionalOutputInline />
            <LegacyFunctions/>
            <ArrowFunctions/>
            <ImpliedReturn />
            <TemplateLiterals/>
            <SimpleArrays/>
            <ArrayIndexAndLength/>
            <AddingAndRemovingToFromArrays/>
            <ForLoops/>
            <MapFunction/>
            <FindFunction/>
            <FindIndex/>
            <FilterFunction/>
            <JsonStringify />
            <House />
            <TodoItem />
            <TodoList />
            <Spreading/>
            <Destructing/>
            <FunctionDestructing/>
            <DestructingImports/>
            <Classes/>
            <Styles/>
            <Add a={3} b={4} />
            <h4>Square of 4</h4>
                <Square>4</Square>
            <hr />
            <Highlight>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
                vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
            </Highlight>
            <PathParameters/>
            <AddPathParameters/>
        </div>
    );
}