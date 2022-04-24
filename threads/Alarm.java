package nachos.threads;

import nachos.machine.*;
import java.util.Comparator;
import java.util.PriorityQueue;

/**
 * Uses the hardware timer to provide preemption, and to allow threads to sleep
 * until a certain time.
 */
public class Alarm {
	/**
	 * Create a private class to implement priority thread
	 */
	private class MyThread{
		public KThread thread;
		public long wake_time;

		MyThread(){
			this.thread = null;
			this.wake_time = 0;
		}

		MyThread(KThread thread, long wake_time){
			this.thread = thread;
			this.wake_time = wake_time;
		}
		class My_Comparator implements Comparator<MyThread>{
			public int compare(MyThread thread1, MyThread thread2){
				if(thread1.wake_time > thread2.wake_time){
					return 1;
				}
				else if(thread1.wake_time == thread2.wake_time){
					return 0;
				}
				else{
					return -1;
				}
			}
		}
	}

	// Create a waitqueue
	MyThread temp = new MyThread();
	private PriorityQueue<MyThread> waitqueue = new PriorityQueue<MyThread>(temp.new My_Comparator());

	/**
	 * Allocate a new Alarm. Set the machine's timer interrupt handler to this
	 * alarm's callback.
	 * 
	 * <p>
	 * <b>Note</b>: Nachos will not function correctly with more than one alarm.
	 */
	public Alarm() {
		Machine.timer().setInterruptHandler(new Runnable() {
			public void run() {
				timerInterrupt();
			}
		});
	}

	/**
	 * The timer interrupt handler. This is called by the machine's timer
	 * periodically (approximately every 500 clock ticks). Causes the current
	 * thread to yield, forcing a context switch if there is another thread that
	 * should be run.
	 */
	public void timerInterrupt() {
		boolean myStatus = Machine.interrupt().disable();
		Lib.assertTrue(Machine.interrupt().disabled());
        if(waitqueue.size() != 0){
            if(waitqueue.peek().wake_time <= Machine.timer().getTime()){
                MyThread next_thread = waitqueue.poll();
                next_thread.thread.ready();
            }
        }

		Machine.interrupt().restore(myStatus);
		KThread.currentThread().yield();
	}

	/**
	 * Put the current thread to sleep for at least <i>x</i> ticks, waking it up
	 * in the timer interrupt handler. The thread must be woken up (placed in
	 * the scheduler ready set) during the first timer interrupt where
	 * 
	 * <p>
	 * <blockquote> (current time) >= (WaitUntil called time)+(x) </blockquote>
	 * 
	 * @param x the minimum number of clock ticks to wait.
	 * 
	 * @see nachos.machine.Timer#getTime()
	 */
	public void waitUntil(long x) {
		// for now, cheat just to get something working (busy waiting is bad)
		boolean myStatus = Machine.interrupt().disable();
		Lib.assertTrue(Machine.interrupt().disabled());
		System.out.println("Stop");

		if(x <= 0){
			return;
		}
		long wakeTime = Machine.timer().getTime() + x;
        KThread cur_thread = KThread.currentThread();
        MyThread store_thread = new MyThread(cur_thread, wakeTime);
        waitqueue.add(store_thread);
        cur_thread.sleep();
		Machine.interrupt().restore(myStatus);
		KThread.yield();
	}

    /**
	 * Cancel any timer set by <i>thread</i>, effectively waking
	 * up the thread immediately (placing it in the scheduler
	 * ready set) and returning true.  If <i>thread</i> has no
	 * timer set, return false.
	 * 
	 * <p>
	 * @param thread the thread whose timer should be cancelled.
	 */
    public boolean cancel(KThread thread) {
		return false;
	}

	// Add Alarm testing code to the Alarm class
    
    public static void alarmTest1() {
		System.out.println("Alaram-Simple-Test");
		int durations[] = {1000, 10*1000, 100*1000};
		long t0, t1;
		for (int d : durations) {
    		t0 = Machine.timer().getTime();
    		ThreadedKernel.alarm.waitUntil (d);
    		t1 = Machine.timer().getTime();
    		System.out.println ("alarmTest1: waited for " + (t1 - t0) + " ticks");
		}
    }

	public static void alarmTest2() {
		System.out.println("Alaram-Ordered-Test");
		KThread child1 = new KThread( new Runnable () {
		public void run() {
			long t0, t1;
    		t0 = Machine.timer().getTime();
    		ThreadedKernel.alarm.waitUntil (10*1000);
    		t1 = Machine.timer().getTime(); 
			System.out.println ("alarmTest2: waited for " + (t1 - t0) + " ticks");  		
		}
   	 	});
			
		KThread child2 = new KThread( new Runnable () {
			public void run() {
				long t2, t3;
    			t2 = Machine.timer().getTime();
    			ThreadedKernel.alarm.waitUntil (1000);
    			t3 = Machine.timer().getTime();   		
				System.out.println ("alarmTest2: waited for " + (t3 - t2) + " ticks");
			}
		});		
		KThread child3 = new KThread( new Runnable () {
			public void run() {
				long t4, t5;
				t4 = Machine.timer().getTime();
				System.out.println ("alarmTest2");
				ThreadedKernel.alarm.waitUntil (5000);
				t5 = Machine.timer().getTime();   
				System.out.println ("alarmTest2: waited for " + (t5 - t4) + " ticks");		
			}
		});
		child1.setName("child1").fork();
		child2.setName("child2").fork();
		child3.setName("child3").fork();
		KThread.yield();
    }

	public static void alarmTest3() {
		System.out.println("Alaram-Zero-Negative-Test");
		int durations[] = {0, -1, 10};
		long t0, t1;
		for (int d : durations) {
    		t0 = Machine.timer().getTime();
    		ThreadedKernel.alarm.waitUntil (d);
    		t1 = Machine.timer().getTime();
    		System.out.println ("alarmTest3: waited for " + (t1 - t0) + " ticks");
		}
    }

    // Implement more test methods here ...
    // Invoke Alarm.selfTest() from ThreadedKernel.selfTest()
    public static void selfTest() {
		alarmTest1();
		alarmTest2();
		alarmTest3();
		// Invoke your other test methods here ...
    }
}
