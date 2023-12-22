import { createBoard } from '@wixc3/react-board';
import { NewInterval } from '../../../components/new-interval/new-interval';
const a = () => {}

export default createBoard({
    name: 'NewInterval',
    Board: () => <NewInterval addNewAlarm = {a} />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 332
    }
});
