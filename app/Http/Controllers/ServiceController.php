<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function GetServices()
    {
        $services = Service::with('Branches')->get();
        return Inertia::render('Admin/Services', [
            'services' => $services,
        ]);
    }

    public function AddService() {
        return Inertia::render('Admin/AddService');
    }

    public function CreateService(Request $request){
        $messages = [
            'service_name.required' => 'Service name is required',
            'service_name.unique' => 'Service name already exists',
            'service_description.required' => 'Service description is required',
            'service_description.min' => 'Service description must be at least 10 characters',
            'service_image.required' => 'Service image is required',
            'service_image.image' => 'Service image must be an image',
            'service_image.mimes' => 'Service image must be a jpeg, png, bmp, or gif',
            'service_image.max' => 'Service image must be less than 2MB',
            'service_icon.required' => 'Service icon is required',
            'service_icon.image' => 'Service icon must be an image',
            'service_icon.mimes' => 'Service icon must be a jpeg, jpg, png, bmp, or gif',
            'service_icon.max' => 'Service icon must be less than 2MB',
        ];
        $rules = [
            'service_name' => 'required|unique:services',
            'service_description' => 'required|min:10',
            'service_image' => 'required|image|mimes:jpeg,jpg,png,bmp,gif|max:2048',
            'service_icon' => 'required|image|mimes:jpeg,jpg,png,bmp,gif|max:2048',
        ];
        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $service = new Service();
        $service->service_name = $request->service_name;
        $service->service_description = $request->service_description;
        $service->service_image = $this->InsertFile($request->file('service_image'));
        $service->service_icon = $this->InsertFile($request->file('service_icon'));
        $service->save();

        return redirect()->route('admin.services')->with('success', 'Service added successfully');
    }

    public function InsertFile($file) {
        $fileName = time().'_'.$file->getClientOriginalName();
        Storage::putFileAs('public/services', $file, $fileName);
        return Storage::url('services/'.$fileName);
    }

    public function DeleteFile($path) {
        $path = str_replace('/storage', '', $path);
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}

