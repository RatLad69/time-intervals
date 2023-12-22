import { createBoard } from '@wixc3/react-board';
import { AlarmTime } from '../../../components/alarm-time/alarm-time';

export default createBoard({
    name: 'AlarmTime',
    Board: () => <AlarmTime duration={[0, 5, 0, 0]} />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 232,
        canvasHeight: 159
    }
});
