
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from "sonner";

interface PeerSupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeName: string;
}

interface PeerOption {
  id: string;
  name: string;
  role: string;
  department: string;
}

const peers: PeerOption[] = [
  { id: '1', name: 'John Smith', role: 'Senior Developer', department: 'Engineering' },
  { id: '2', name: 'Emma Johnson', role: 'Tech Lead', department: 'Engineering' },
  { id: '3', name: 'Michael Brown', role: 'Senior Frontend Developer', department: 'Engineering' },
  { id: '4', name: 'Sara Wilson', role: 'Frontend Developer', department: 'Engineering' },
  { id: '5', name: 'Robert Davis', role: 'Backend Developer', department: 'Engineering' },
];

const PeerSupportDialog: React.FC<PeerSupportDialogProps> = ({ 
  open, 
  onOpenChange,
  employeeName 
}) => {
  const [selectedPeers, setSelectedPeers] = useState<string[]>([]);

  const handlePeerSelection = (peerId: string) => {
    setSelectedPeers(current => {
      if (current.includes(peerId)) {
        return current.filter(id => id !== peerId);
      } else {
        return [...current, peerId];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPeers.length === 0) {
      toast.error("Please select at least one peer.");
      return;
    }
    toast.success(`Peer support assigned successfully for ${employeeName}!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Peer Support</DialogTitle>
          <DialogDescription>
            Select peers who can provide support and mentorship for {employeeName}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="max-h-80 overflow-y-auto space-y-3">
            {peers.map((peer) => (
              <div key={peer.id} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded">
                <Checkbox 
                  id={`peer-${peer.id}`} 
                  checked={selectedPeers.includes(peer.id)}
                  onCheckedChange={() => handlePeerSelection(peer.id)}
                  className="mt-1"
                />
                <div className="grid gap-1.5">
                  <label
                    htmlFor={`peer-${peer.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {peer.name}
                  </label>
                  <p className="text-sm text-gray-500">
                    {peer.role} • {peer.department}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Assign Support</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PeerSupportDialog;
