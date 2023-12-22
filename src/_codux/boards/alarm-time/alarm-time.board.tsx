import { createBoard } from '@wixc3/react-board';
import { AlarmTime } from '../../../components/alarm-time/alarm-time';

export default createBoard({
    name: 'AlarmTime',
    Board: () => <AlarmTime />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 232,
        canvasHeight: 159
    }
});
